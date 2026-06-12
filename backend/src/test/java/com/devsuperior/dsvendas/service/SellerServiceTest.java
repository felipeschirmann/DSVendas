package com.devsuperior.dsvendas.service;

import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@ExtendWith(SpringExtension.class)
public class SellerServiceTest {

    @InjectMocks
    private SellerService service;

    @Mock
    private SellerRepository repository;

    private Seller seller;

    @BeforeEach
    void setUp() throws Exception {
        seller = new Seller(1L, "Logan");
    }

    @Test
    public void findAllShouldReturnListOfSellerDTO() {
        List<Seller> list = new ArrayList<>();
        list.add(seller);

        Mockito.when(repository.findAll()).thenReturn(list);

        List<SellerDTO> result = service.findAll();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Logan", result.get(0).getName());
        Mockito.verify(repository, Mockito.times(1)).findAll();
    }
}
