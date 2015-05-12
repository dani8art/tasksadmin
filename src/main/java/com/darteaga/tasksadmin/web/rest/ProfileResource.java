package com.darteaga.tasksadmin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.darteaga.tasksadmin.domain.Profile;
import com.darteaga.tasksadmin.repository.ProfileRepository;
import com.darteaga.tasksadmin.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing Profile.
 */
@RestController
@RequestMapping("/api")
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

    @Inject
    private ProfileRepository profileRepository;

    /**
     * POST  /profiles -> Create a new profile.
     */
    @RequestMapping(value = "/profiles",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to save Profile : {}", profile);
        if (profile.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new profile cannot already have an ID").build();
        }
        profileRepository.save(profile);
        return ResponseEntity.created(new URI("/api/profiles/" + profile.getId())).build();
    }

    /**
     * PUT  /profiles -> Updates an existing profile.
     */
    @RequestMapping(value = "/profiles",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to update Profile : {}", profile);
        if (profile.getId() == null) {
            return create(profile);
        }
        profileRepository.save(profile);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /profiles -> get all the profiles.
     */
    @RequestMapping(value = "/profiles",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Profile>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Profile> page = profileRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/profiles", offset, limit);
        return new ResponseEntity<List<Profile>>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /profiles/:id -> get the "id" profile.
     */
    @RequestMapping(value = "/profiles/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Profile> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get Profile : {}", id);
        Profile profile = profileRepository.findOne(id);
        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    /**
     * DELETE  /profiles/:id -> delete the "id" profile.
     */
    @RequestMapping(value = "/profiles/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Profile : {}", id);
        profileRepository.delete(id);
    }
}
