package com.school.attendance.location.seeder;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.location.repository.LocalGovernmentRepository;
import com.school.attendance.location.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class LocationDataSeeder implements CommandLineRunner {

    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;

    private static final String CSV_FILE = "data/nigerian-locations.csv";
    private static final String NIGERIA_PARENT_ID = "1";

    // State code mappings (2-letter codes for each state)
    private static final Map<String, String> STATE_CODES = Map.ofEntries(
            Map.entry("Abia", "AB"),
            Map.entry("Adamawa", "AD"),
            Map.entry("Akwa Ibom", "AK"),
            Map.entry("Anambra", "AN"),
            Map.entry("Bauchi", "BA"),
            Map.entry("Bayelsa", "BY"),
            Map.entry("Benue", "BE"),
            Map.entry("Borno", "BO"),
            Map.entry("Cross River", "CR"),
            Map.entry("Delta", "DE"),
            Map.entry("Ebonyi", "EB"),
            Map.entry("Edo", "ED"),
            Map.entry("Ekiti", "EK"),
            Map.entry("Enugu", "EN"),
            Map.entry("FCT", "FC"),
            Map.entry("Gombe", "GO"),
            Map.entry("Imo", "IM"),
            Map.entry("Jigawa", "JI"),
            Map.entry("Kaduna", "KD"),
            Map.entry("Kano", "KN"),
            Map.entry("Katsina", "KT"),
            Map.entry("Kebbi", "KE"),
            Map.entry("Kogi", "KO"),
            Map.entry("Kwara", "KW"),
            Map.entry("Lagos", "LA"),
            Map.entry("Nasarawa", "NA"),
            Map.entry("Niger", "NI"),
            Map.entry("Ogun", "OG"),
            Map.entry("Ondo", "ON"),
            Map.entry("Osun", "OS"),
            Map.entry("Oyo", "OY"),
            Map.entry("Plateau", "PL"),
            Map.entry("Rivers", "RI"),
            Map.entry("Sokoto", "SO"),
            Map.entry("Taraba", "TA"),
            Map.entry("Yobe", "YO"),
            Map.entry("Zamfara", "ZA")
    );

    @Override
    @Transactional
    public void run(String... args) {
        // Skip if data already exists
        if (stateRepository.count() > 0) {
            log.info("Location data already exists. Skipping seeding.");
            return;
        }

        log.info("Starting location data seeding from CSV...");

        try {
            List<String[]> csvData = readCsvFile();

            // Map old numeric IDs to new UUIDs
            Map<String, UUID> idMapping = new HashMap<>();

            // First pass: Create states
            int stateCount = createStates(csvData, idMapping);
            log.info("Created {} states", stateCount);

            // Second pass: Create local governments
            int lgaCount = createLocalGovernments(csvData, idMapping);
            log.info("Created {} local governments", lgaCount);

            log.info("Location data seeding completed successfully!");

        } catch (Exception e) {
            log.error("Failed to seed location data", e);
            throw new RuntimeException("Location data seeding failed", e);
        }
    }

    private List<String[]> readCsvFile() throws IOException, CsvException {
        ClassPathResource resource = new ClassPathResource(CSV_FILE);
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            List<String[]> data = reader.readAll();
            data.remove(0); // Remove header row
            return data;
        }
    }

    private int createStates(List<String[]> csvData, Map<String, UUID> idMapping) {
        int count = 0;

        for (String[] row : csvData) {
            String id = row[0];
            String name = row[1];
            String parentId = row[3];

            // Only process rows where parent_id = "1" (states under Nigeria)
            if (NIGERIA_PARENT_ID.equals(parentId)) {
                String code = STATE_CODES.getOrDefault(name, generateCode(name));

                // Check if state already exists
                if (stateRepository.existsByName(name)) {
                    log.debug("State {} already exists, skipping", name);
                    State existingState = stateRepository.findByName(name).orElseThrow();
                    idMapping.put(id, existingState.getId());
                    continue;
                }

                State state = State.builder()
                        .name(name)
                        .code(code)
                        .build();

                State savedState = stateRepository.save(state);
                idMapping.put(id, savedState.getId());

                log.debug("Created state: {} ({})", name, code);
                count++;
            }
        }

        return count;
    }

    private int createLocalGovernments(List<String[]> csvData, Map<String, UUID> idMapping) {
        int count = 0;

        for (String[] row : csvData) {
            String id = row[0];
            String name = row[1];
            String parentId = row[3];

            // Only process rows where parent_id is a known state ID
            if (parentId != null && idMapping.containsKey(parentId)) {
                UUID stateId = idMapping.get(parentId);
                State state = stateRepository.findById(stateId).orElseThrow();

                // Check if LGA already exists for this state
                if (localGovernmentRepository.existsByNameAndStateId(name, stateId)) {
                    log.debug("LGA {} already exists for state {}, skipping", name, state.getName());
                    continue;
                }

                LocalGovernment lga = LocalGovernment.builder()
                        .name(name)
                        .state(state)
                        .build();

                localGovernmentRepository.save(lga);

                log.debug("Created LGA: {} in {}", name, state.getName());
                count++;
            }
        }

        return count;
    }

    /**
     * Generate a 2-letter code from state name if not in predefined map
     */
    private String generateCode(String name) {
        if (name.length() >= 2) {
            return name.substring(0, 2).toUpperCase();
        }
        return name.toUpperCase();
    }
}
