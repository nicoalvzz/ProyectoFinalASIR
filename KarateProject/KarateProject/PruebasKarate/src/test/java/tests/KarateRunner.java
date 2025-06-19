package tests;

import com.intuit.karate.junit5.Karate;

public class KarateRunner {
    @Karate.Test
    Karate testFrontend() {
        return Karate.run("get-movies").relativeTo(getClass());
    }
}
