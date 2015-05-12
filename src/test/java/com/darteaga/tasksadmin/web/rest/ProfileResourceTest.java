package com.darteaga.tasksadmin.web.rest;

import com.darteaga.tasksadmin.Application;
import com.darteaga.tasksadmin.domain.Profile;
import com.darteaga.tasksadmin.repository.ProfileRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.joda.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProfileResource REST controller.
 *
 * @see ProfileResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class ProfileResourceTest {

    private static final String DEFAULT_IMAGE = "SAMPLE_TEXT";
    private static final String UPDATED_IMAGE = "UPDATED_TEXT";

    private static final LocalDate DEFAULT_LAST_LOGIN = new LocalDate(0L);
    private static final LocalDate UPDATED_LAST_LOGIN = new LocalDate();

    @Inject
    private ProfileRepository profileRepository;

    private MockMvc restProfileMockMvc;

    private Profile profile;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ProfileResource profileResource = new ProfileResource();
        ReflectionTestUtils.setField(profileResource, "profileRepository", profileRepository);
        this.restProfileMockMvc = MockMvcBuilders.standaloneSetup(profileResource).build();
    }

    @Before
    public void initTest() {
        profile = new Profile();
        profile.setImage(DEFAULT_IMAGE);
        profile.setLastLogin(DEFAULT_LAST_LOGIN);
    }

    @Test
    @Transactional
    public void createProfile() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();

        // Create the Profile
        restProfileMockMvc.perform(post("/api/profiles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(profile)))
                .andExpect(status().isCreated());

        // Validate the Profile in the database
        List<Profile> profiles = profileRepository.findAll();
        assertThat(profiles).hasSize(databaseSizeBeforeCreate + 1);
        Profile testProfile = profiles.get(profiles.size() - 1);
        assertThat(testProfile.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProfile.getLastLogin()).isEqualTo(DEFAULT_LAST_LOGIN);
    }

    @Test
    @Transactional
    public void getAllProfiles() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profiles
        restProfileMockMvc.perform(get("/api/profiles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
                .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())))
                .andExpect(jsonPath("$.[*].LastLogin").value(hasItem(DEFAULT_LAST_LOGIN.toString())));
    }

    @Test
    @Transactional
    public void getProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(profile.getId().intValue()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()))
            .andExpect(jsonPath("$.LastLogin").value(DEFAULT_LAST_LOGIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfile() throws Exception {
        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);
		
		int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile
        profile.setImage(UPDATED_IMAGE);
        profile.setLastLogin(UPDATED_LAST_LOGIN);
        restProfileMockMvc.perform(put("/api/profiles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(profile)))
                .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profiles = profileRepository.findAll();
        assertThat(profiles).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profiles.get(profiles.size() - 1);
        assertThat(testProfile.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProfile.getLastLogin()).isEqualTo(UPDATED_LAST_LOGIN);
    }

    @Test
    @Transactional
    public void deleteProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);
		
		int databaseSizeBeforeDelete = profileRepository.findAll().size();

        // Get the profile
        restProfileMockMvc.perform(delete("/api/profiles/{id}", profile.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Profile> profiles = profileRepository.findAll();
        assertThat(profiles).hasSize(databaseSizeBeforeDelete - 1);
    }
}
