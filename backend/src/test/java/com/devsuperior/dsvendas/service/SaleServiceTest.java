package com.devsuperior.dsvendas.service;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@ExtendWith(SpringExtension.class)
public class SaleServiceTest {

    @InjectMocks
    private SaleService service;

    @Mock
    private SaleRepository repository;

    @Mock
    private SellerRepository sellerRepository;

    private Seller seller;
    private Sale sale;

    @BeforeEach
    void setUp() throws Exception {
        seller = new Seller(1L, "Logan");
        sale = new Sale(1L, 100, 50, 15000.0, LocalDate.now(), seller);
    }

    @Test
    public void findAllShouldReturnPageOfSaleDTO() {
        Pageable pageable = PageRequest.of(0, 10);
        List<Sale> list = new ArrayList<>();
        list.add(sale);
        Page<Sale> page = new PageImpl<>(list);

        Mockito.when(sellerRepository.findAll()).thenReturn(new ArrayList<>());
        Mockito.when(repository.findAll(pageable)).thenReturn(page);

        Page<SaleDTO> result = service.findAll(pageable);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.getContent().size());
        Assertions.assertEquals(15000.0, result.getContent().get(0).getAmount());
        Mockito.verify(sellerRepository, Mockito.times(1)).findAll();
        Mockito.verify(repository, Mockito.times(1)).findAll(pageable);
    }

    @Test
    public void amountGroupedBySellerShouldReturnListOfSaleSumDTO() {
        List<SaleSumDTO> list = new ArrayList<>();
        list.add(new SaleSumDTO(seller, 15000.0));

        Mockito.when(repository.amountGroupedBySeller()).thenReturn(list);

        List<SaleSumDTO> result = service.amountGroupedBySeller();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Logan", result.get(0).getSellerName());
        Mockito.verify(repository, Mockito.times(1)).amountGroupedBySeller();
    }

    @Test
    public void successGroupedBySellerShouldReturnListOfSaleSuccessDTO() {
        List<SaleSuccessDTO> list = new ArrayList<>();
        list.add(new SaleSuccessDTO(seller, 100L, 50L));

        Mockito.when(repository.successGroupedBySeller()).thenReturn(list);

        List<SaleSuccessDTO> result = service.successGroupedBySeller();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Logan", result.get(0).getSellerName());
        Mockito.verify(repository, Mockito.times(1)).successGroupedBySeller();
    }
}
