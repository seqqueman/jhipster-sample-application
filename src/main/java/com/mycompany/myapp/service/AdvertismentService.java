package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Advertisment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Advertisment}.
 */
public interface AdvertismentService {

    /**
     * Save a advertisment.
     *
     * @param advertisment the entity to save.
     * @return the persisted entity.
     */
    Advertisment save(Advertisment advertisment);

    /**
     * Get all the advertisments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Advertisment> findAll(Pageable pageable);
    /**
     * Get all the AdvertismentDTO where Address is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Advertisment> findAllWhereAddressIsNull();
    /**
     * Get all the AdvertismentDTO where Feature is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Advertisment> findAllWhereFeatureIsNull();


    /**
     * Get the "id" advertisment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Advertisment> findOne(Long id);

    /**
     * Delete the "id" advertisment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
