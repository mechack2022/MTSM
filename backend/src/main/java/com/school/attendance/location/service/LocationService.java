package com.school.attendance.location.service;

import com.school.attendance.location.dto.LocalGovernmentResponse;
import com.school.attendance.location.dto.StateResponse;
import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.location.repository.LocalGovernmentRepository;
import com.school.attendance.location.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationService {

    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;

    /**
     * Get all Nigerian states
     */
    public List<StateResponse> getAllStates() {
        log.debug("Fetching all states");
        return stateRepository.findAll().stream()
                .map(this::mapToStateResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all LGAs for a specific state
     */
    public List<LocalGovernmentResponse> getLGAsByStateId(UUID stateId) {
        log.debug("Fetching LGAs for state ID: {}", stateId);
        return localGovernmentRepository.findByStateId(stateId).stream()
                .map(this::mapToLGAResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all LGAs for a specific state code
     */
    public List<LocalGovernmentResponse> getLGAsByStateCode(String stateCode) {
        log.debug("Fetching LGAs for state code: {}", stateCode);
        return localGovernmentRepository.findByState_Code(stateCode).stream()
                .map(this::mapToLGAResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get a specific state by ID
     */
    public StateResponse getStateById(UUID stateId) {
        log.debug("Fetching state by ID: {}", stateId);
        return stateRepository.findById(stateId)
                .map(this::mapToStateResponse)
                .orElseThrow(() -> new RuntimeException("State not found with ID: " + stateId));
    }

    /**
     * Get a specific state by code
     */
    public StateResponse getStateByCode(String code) {
        log.debug("Fetching state by code: {}", code);
        return stateRepository.findByCode(code)
                .map(this::mapToStateResponse)
                .orElseThrow(() -> new RuntimeException("State not found with code: " + code));
    }

    private StateResponse mapToStateResponse(State state) {
        return StateResponse.builder()
                .id(state.getId())
                .name(state.getName())
                .code(state.getCode())
                .build();
    }

    private LocalGovernmentResponse mapToLGAResponse(LocalGovernment lga) {
        return LocalGovernmentResponse.builder()
                .id(lga.getId())
                .name(lga.getName())
                .stateId(lga.getState().getId())
                .stateName(lga.getState().getName())
                .build();
    }
}
