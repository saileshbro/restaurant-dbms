CREATE TABLE IF NOT EXISTS contact_info(
    contact_info_id INT(11) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(30) NOT NULL
);
CREATE TABLE IF NOT EXISTS food_category(
    food_category_id INT(12) NOT NULL,
    food_category_name VARCHAR (100),
    PRIMARY KEY (food_category_id,food_category_name)
);

CREATE TABLE IF NOT EXISTS food_item(
    food_item_name VARCHAR (100) PRIMARY KEY,
    food_item_price INT (10),
    food_category_id INT (10),
    FOREIGN KEY (food_category_id) REFERENCES food_category(food_category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS menu(
    menu_name VARCHAR(100),
    menu_start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE,
    menu_end_date TIMESTAMP,
    is_menu_active BIT DEFAULT 1,
    PRIMARY KEY (menu_name,menu_start_date)
);

CREATE TABLE IF NOT EXISTS menu_content(
    menu_name VARCHAR(100),
    food_item_name VARCHAR(100),
    is_food_available BIT DEFAULT 1,
    FOREIGN KEY (food_item_name) REFERENCES food_item(food_item_name) ON DELETE CASCADE,
    FOREIGN KEY (menu_name) REFERENCES menu(menu_name) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS customer(
    user_id VARCHAR(100) PRIMARY KEY,
    contact_info_id INT(11),
    foreign KEY (contact_info_id) REFERENCES contact_info(contact_info_id),
    foreign KEY (user_id) REFERENCES user(user_id),   
);
CREATE TABLE IF NOT EXISTS user(
    user_id VARCHAR(100),
    username VARCHAR(50),
    password VARCHAR(255),
    PRIMARY KEY(user_id,username)
    
);

CREATE TABLE IF NOT EXISTS staff_category(
    staff_category VARCHAR(100) PRIMARY KEY,
    salary double(10,2)
);
CREATE TABLE IF NOT EXISTS staff(
    user_id VARCHAR(100) PRIMARY KEY,
    staff_category VARCHAR(100),
    last_paid_date TIMESTAMP,
    contact_info_id INT(11),
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE,
    FOREIGN KEY (contact_info_id) REFERENCES contact_info(contact_info_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (staff_category) REFERENCES staff_category(staff_category) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS import_company(
    import_company_id INT(11) PRIMARY KEY,
    total_transaction double(10,2) DEFAULT 0,
    remain_transaction double(10,2) DEFAULT 0,
    purchase_type VARCHAR(128),
    FOREIGN KEY (import_company_id) REFERENCES contact_info(contact_info_id)
);

Create TABLE IF NOT EXISTS restaurant(
    restaurant_id INT(11) PRIMARY KEY,
    total_staff INT(11),
    capacity INT(11),
    total_tables INT(11),
    foreign KEY (restaurant_id) REFERENCES contact_info(contact_info_id)
);


CREATE TABLE IF NOT EXISTS restaurant_table(
    table_no INT(11) PRIMARY KEY,
    is_empty BIT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS import(
    import_company_id INT(11),
    bill_no INT(11),
    total_price double(10,2),
    import_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE,  
    PRIMARY KEY(bill_no,import_date),
    FOREIGN KEY(import_company_id) REFERENCES import_company(contact_info_id)  
)

CREATE TABLE IF NOT EXISTS import_detail(
    import_good VARCHAR(255),
    bill_no INT(11),
    quantity VARCHAR(80),
    price double(10,2),
    FOREIGN KEY (bill_no) REFERENCES import(bill_no)
);

CREATE TABLE IF NOT EXISTS stock(
    name VARCHAR(120) PRIMARY KEY,
	type_of_stock VARCHAR(80),
    last_import_date TIMESTAMP,
    quantity VARCHAR(80),
    FOREIGN KEY (import_date) REFERENCES import(import_date)
);
CREATE TABLE IF NOT EXISTS reservation(
    customer_id INT(11),
    table_no INT(11),
    number_of_person INT(2),
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE,
    PRIMARY KEY (reservation_date),
    FOREIGN KEY (customer_id) REFERENCES customer(user_id),
    FOREIGN KEY (table_no) REFERENCES restaurant_table(table_no)
);
CREATE TABLE IF NOT EXISTS bill(
	bill_no INT(11) PRIMARY KEY,
	order_id INT(11),
	total_price double(10,2),
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE
    );

CREATE TABLE IF NOT EXISTS home_delivery(
    customer_id INT(11),
    delivery_staff_id INT(11),
    bill_no INT(11),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE,
    is_delivered BIT DEFAULT 0,
    PRIMARY KEY (order_date),
    FOREIGN KEY (customer_id) REFERENCES customer(user_id),
    FOREIGN KEY (delivery_staff_id) REFERENCES staff(user_id),
    FOREIGN KEY (bill_no) REFERENCES bill(bill_no)
);


                CREATE TABLE food_order
                (
                    order_id int(10) NOT NULL
                    AUTO_INCREMENT,
    table_id int
                    (11),
    PRIMARY KEY
                    (order_id),
    FOREIGN KEY
                    (table_id) REFERENCES restaurant_table
                    (table_id)
);

                    CREATE TABLE order_item
                    (
                        order_id int(10),
                        food_item_id int(10),
                        quantity int(3),
                        FOREIGN KEY (order_id) REFERENCES food_order(order_id),
                        FOREIGN KEY (food_item_id) REFERENCES food_item(food_item_id)
                    );