package com.school.attendance.common.api;

import java.util.List;
import java.util.stream.Collectors;

// A custom functional interface for mapping Entities to DTOs
@FunctionalInterface
public interface EntityMapper<E, D> {

    D toDto(E entity);

    default List<D> toDtoList(List<E> entities){
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
