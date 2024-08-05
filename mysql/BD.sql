DROP DATABASE IF EXISTS pricemanager;
CREATE DATABASE pricemanager;
USE pricemanager;

CREATE TABLE formula (
    id INT AUTO_INCREMENT,
    formula VARCHAR(255) NOT NULL,
    CONSTRAINT pk_formula PRIMARY KEY(id)
);

CREATE TABLE proveedor (
    id INT,
    nombre VARCHAR(255) NOT NULL,
    formula_id INT NOT NULL,
    CONSTRAINT pk_proveed PRIMARY KEY(id),
    CONSTRAINT proveed_formula_id FOREIGN KEY (formula_id) REFERENCES formula(id)
);

CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NULL,
    precio_neto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);
