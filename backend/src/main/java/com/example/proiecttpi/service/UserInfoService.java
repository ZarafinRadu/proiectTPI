package com.example.proiecttpi.service;

import com.example.proiecttpi.entity.UserInfo;
import com.example.proiecttpi.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

@Autowired
    private UserInfoRepository repository;

@Autowired
    private PasswordEncoder encoder;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByUserName(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public ResponseEntity<?> addUser(UserInfo userInfo) {
        // Check if a user already exists with the provided email
        Optional<UserInfo> existingUser = repository.findByUserName(userInfo.getUserName());
        if (existingUser.isPresent()) {
            // User with the email already exists, return an error response
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"message\": \"User with this user name already exists\"}");
        }

        // Encode the password before saving the user
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));

        // Save the new user
        repository.save(userInfo);

        // Return success response
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("{\"message\": \"User Added Successfully\"}");
    }

}
