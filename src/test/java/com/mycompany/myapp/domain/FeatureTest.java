package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class FeatureTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Feature.class);
        Feature feature1 = new Feature();
        feature1.setId(1L);
        Feature feature2 = new Feature();
        feature2.setId(feature1.getId());
        assertThat(feature1).isEqualTo(feature2);
        feature2.setId(2L);
        assertThat(feature1).isNotEqualTo(feature2);
        feature1.setId(null);
        assertThat(feature1).isNotEqualTo(feature2);
    }
}
