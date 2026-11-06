package com.school.attendance.location.controller;

import com.school.attendance.location.dto.LocalGovernmentResponse;
import com.school.attendance.location.dto.StateResponse;
import com.school.attendance.location.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
@Tag(name = "Locations", description = "Nigerian States and Local Government Areas API")
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/states")
    @Operation(summary = "Get all Nigerian states", description = "Returns a list of all 37 Nigerian states")
    public ResponseEntity<List<StateResponse>> getAllStates() {
        log.info("REST request to get all states");
        return ResponseEntity.ok(locationService.getAllStates());
    }

    @GetMapping("/states/{stateId}")
    @Operation(summary = "Get state by ID", description = "Returns a single state by its UUID")
    public ResponseEntity<StateResponse> getStateById(@PathVariable UUID stateId) {
        log.info("REST request to get state by ID: {}", stateId);
        return ResponseEntity.ok(locationService.getStateById(stateId));
    }

    @GetMapping("/states/code/{code}")
    @Operation(summary = "Get state by code", description = "Returns a single state by its code (e.g., 'LA' for Lagos)")
    public ResponseEntity<StateResponse> getStateByCode(@PathVariable String code) {
        log.info("REST request to get state by code: {}", code);
        return ResponseEntity.ok(locationService.getStateByCode(code));
    }

    @GetMapping("/states/{stateId}/lgas")
    @Operation(summary = "Get LGAs by state ID", description = "Returns all Local Government Areas for a specific state")
    public ResponseEntity<List<LocalGovernmentResponse>> getLGAsByStateId(@PathVariable UUID stateId) {
        log.info("REST request to get LGAs for state ID: {}", stateId);
        return ResponseEntity.ok(locationService.getLGAsByStateId(stateId));
    }

    @GetMapping("/states/code/{code}/lgas")
    @Operation(summary = "Get LGAs by state code", description = "Returns all Local Government Areas for a specific state code")
    public ResponseEntity<List<LocalGovernmentResponse>> getLGAsByStateCode(@PathVariable String code) {
        log.info("REST request to get LGAs for state code: {}", code);
        return ResponseEntity.ok(locationService.getLGAsByStateCode(code));
    }
}
