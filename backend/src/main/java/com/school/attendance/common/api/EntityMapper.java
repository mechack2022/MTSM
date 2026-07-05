package com.school.attendance.common.api;

import java.util.List;
import java.util.stream.Collectors;

@FunctionalInterface
public interface EntityMapper<E, D> {

    D toDto(E entity);

    default List<D> toDtoList(List<E> entities){
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
