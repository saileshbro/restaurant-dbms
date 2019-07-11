CREATE TABLE food_category(
    food_category_id int(12) not null AUTO_INCREMENT,
    food_category_name varchar (100) UNIQUE,
    primary key (food_category_id)
);

CREATE TABLE food_item(
    food_item_id int(10) not null AUTO_INCREMENT,
    name varchar (100) UNIQUE,
    price int (10),
    food_category_id int (10),
    primary key (food_item_id),
    FOREIGN KEY (food_category_id) REFERENCES food_category(food_category_id) ON DELETE CASCADE
);

CREATE TABLE menu(
    menu_id int(11) not null AUTO_INCREMENT,
    start_date date,
    end_date date,
    is_active bit,
    primary key (menu_id)
);
CREATE TABLE menu_content(
    menu_id int(11) not null AUTO_INCREMENT,
    food_item_id int(10),
    is_available bit,
    FOREIGN KEY (food_item_id) REFERENCES food_item(food_item_id) ON DELETE CASCADE,
    FOREIGN KEY(menu_id) REFERENCES menu(menu_id)
);
CREATE TABLE if not exists customer(
    customer_id int(11) primary key,
    name varchar(100)
);
CREATE TABLE if not EXISTS contact_info(
    contact_info_id int(11) PRIMARY key,
    address varchar(150),
    resturant_id int(11) DEFAULT 0,
    import_company_id int(11) DEFAULT 0,
    staff_id int(11) DEFAULT 0,
    customer_id int(11) DEFAULT 0,
    email varchar(150),
    phone varchar(30),
    foreign key (resturant_id) references restaurant(resturant_id) on DELETE CASCADE,
    foreign key (import_company_id) references import_company(import_company_id) on DELETE CASCADE,
    foreign key (staff_id) references staff(staff_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) references customer(customer_id) ON DELETE CASCADE
);
CREATE TABLE if not exists manager(
    username varchar(50) primary key,
    password varchar(255),
    name varchar(100));

CREATE TABLE if not exists staff_category(
	staff_category_id int(11) PRIMARY key AUTO_INCREMENT,
    category varchar(100) UNIQUE,
    salary double(10,2)  
);

CREATE TABLE IF not EXISTS import_company(
	import_company_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(128),
    contact_info_id int(11),
    total_transaction double(10,2),
    remain_transaction double(10,2),
    purchase_type varchar(128),
    FOREIGN KEY contact_info_id()
);
Create TABLE IF not exists restaurant(
    resturant_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(255),
    total_staff int(11),
    capacity int(11),
    total_tables int(11)   
);
CREATE TABLE if not EXISTS staff(
   staff_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(150),
    staff_category_id int(11),
    last_paid_date date,
    joined_date date,
    FOREIGN key (staff_category_id) references staff_cat(staff_category_id) on DELETE CASCADE);

CREATE TABLE if not EXISTS restaurant_table(
    table_id int(11) PRIMARY key AUTO_INCREMENT,
    is_empty bit,
    date_time Date,
    table_no int(11));

CREATE TABLE if not exists import(
    import_id int(11) primary key AUTO_INCREMENT,
    import_company_id int(11),
    good varchar(255),
    bill_no int(11),
    quantiy varchar(80),
    total_price double(10,2),
    import_date date,
    FOREIGN key (import_company_id) references import_company(import_company_id)
);

CREATE TABLE if not exists stock(
	stock_id int(11) PRIMARY key AUTO_INCREMENT,
	type_of_stock varchar(80),
    name varchar(120),
    import_id int(11),
    quantity varchar(80),
    FOREIGN key (import_id) REFERENCES import(import_id)
);
CREATE TABLE if not exists bill(
	bill_id int(11) primary key AUTO_INCREMENT,
	order_id int(11),
    reservation_id int(11) DEFAULT 0,
	total_price double(10,2),
    FOREIGN KEY reservation_id REFERENCES reservation(reservation_id)
    );

CREATE TABLE IF NOT EXISTS home_delivery(
    home_delivery_id int(11) PRIMARY KEY AUTO_INCREMENT,
    customer_id int(11),
    staff_id int(11),
    bill_id int(11),
    issue_date date,
    FOREIGN KEY customer_id REFERENCES customer(customer_id),
    FOREIGN KEY staff_id REFERENCES staff(staff_id),
    FOREIGN KEY bill_id REFERENCES bill(bill_id)
);
CREATE TABLE IF NOT EXISTS reservation(
    reservation_id int(11) PRIMARY KEY AUTO_INCREMENT,
    customer_id int(11),
    table_id int(11),
    number_of_person int(2),
    reservation_date date,
    FOREIGN KEY customer_id REFERENCES customer(customer_id),
    FOREIGN KEY table_id REFERENCES restaurant_table(table_id)
);