package com.selahpraise.selahpraise.domain.repositories.generic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GenericSpringDataRepository<T, ID> extends JpaRepository<T, ID> {

}
