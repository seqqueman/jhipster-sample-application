package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.AdvertismentService;
import com.mycompany.myapp.domain.Advertisment;
import com.mycompany.myapp.repository.AdvertismentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Advertisment}.
 */
@Service
@Transactional
public class AdvertismentServiceImpl implements AdvertismentService {

    private final Logger log = LoggerFactory.getLogger(AdvertismentServiceImpl.class);

    private final AdvertismentRepository advertismentRepository;

    public AdvertismentServiceImpl(AdvertismentRepository advertismentRepository) {
        this.advertismentRepository = advertismentRepository;
    }

    @Override
    public Advertisment save(Advertisment advertisment) {
        log.debug("Request to save Advertisment : {}", advertisment);
        return advertismentRepository.save(advertisment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Advertisment> findAll(Pageable pageable) {
        log.debug("Request to get all Advertisments");
        return advertismentRepository.findAll(pageable);
    }



    /**
     *  Get all the advertisments where Address is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Advertisment> findAllWhereAddressIsNull() {
        log.debug("Request to get all advertisments where Address is null");
        return StreamSupport
            .stream(advertismentRepository.findAll().spliterator(), false)
            .filter(advertisment -> advertisment.getAddress() == null)
            .collect(Collectors.toList());
    }


    /**
     *  Get all the advertisments where Feature is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Advertisment> findAllWhereFeatureIsNull() {
        log.debug("Request to get all advertisments where Feature is null");
        return StreamSupport
            .stream(advertismentRepository.findAll().spliterator(), false)
            .filter(advertisment -> advertisment.getFeature() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Advertisment> findOne(Long id) {
        log.debug("Request to get Advertisment : {}", id);
        return advertismentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Advertisment : {}", id);
        advertismentRepository.deleteById(id);
    }
}
