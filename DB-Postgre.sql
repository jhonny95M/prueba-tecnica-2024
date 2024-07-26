CREATE DATABASE "prueba-tecnica"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    role_id SERIAL NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
-- Insertar roles de prueba
INSERT INTO roles (role_name) VALUES ('user'), ('admin'), ('superadmin');

-- Modificar la tabla de usuarios para relacionarla con los roles
ALTER TABLE users ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id)
REFERENCES roles(id);

-- Insertar un usuario de prueba con el rol asociado
INSERT INTO users (username, password, email, date_of_birth, role_id)
VALUES 
('admin', 'password', 'jmalpartida@experis.com', '1995-05-08', 1);