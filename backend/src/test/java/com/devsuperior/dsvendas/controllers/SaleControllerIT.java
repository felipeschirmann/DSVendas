package com.devsuperior.dsvendas.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class SaleControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void findAllShouldReturnPageOfSaleDTO() throws Exception {
        mockMvc.perform(get("/sales")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").exists())
                .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    public void amountGroupedBySellerShouldReturnListOfSaleSumDTO() throws Exception {
        mockMvc.perform(get("/sales/amount-by-seller")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void successGroupedBySellerShouldReturnListOfSaleSuccessDTO() throws Exception {
        mockMvc.perform(get("/sales/success-by-seller")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void findAllWithInvalidSwaggerSortShouldReturnUnsortedPage() throws Exception {
        mockMvc.perform(get("/sales?page=0&size=20&sort=string")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").exists())
                .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    public void findAllWithInvalidSortPropertyShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/sales?page=0&size=20&sort=invalidField")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Invalid sorting property"))
                .andExpect(jsonPath("$.message").exists());
    }
}
