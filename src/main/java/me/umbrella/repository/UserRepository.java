package me.umbrella.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import me.umbrella.model.User;

public interface UserRepository extends CrudRepository<User, Long>{
    
    @Query(value = "select * from umbrella_users_db.user where email = :email and password = :password", nativeQuery = true)
    public User login(String email, String password);
}
