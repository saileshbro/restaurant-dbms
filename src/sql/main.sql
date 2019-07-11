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
    is_active int(1),
    primary key (menu_id)
);
CREATE TABLE menu_content(
    menu_id int(11) not null AUTO_INCREMENT,
    food_item_id int(10),
    is_available int(1),
    FOREIGN KEY (food_item_id) REFERENCES food_item(food_item_id) ON DELETE CASCADE,
    FOREIGN KEY(menu_id) REFERENCES menu(menu_id)
);

create table if not exists manager(
    username varchar(50) primary key,
    password varchar(255),
    name varchar(100));

create table if not exists staff_cat(
	staff_cat_id int(11) PRIMARY key AUTO_INCREMENT,
    category varchar(100) UNIQUE,
    salary double(10,2)  
);

CREATE table if not EXISTS import_company(
	import_comp_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(128),
    address varchar(255),
    total_trans double(10,2),
    remain_trans double(10,2),
    purchase_type varchar(128)
);
Create table if not exists restaurant(
    rest_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(255),
    address varchar(255),
    total_staff int(11),
    capacity int(11),
    total_tables int(11)   
);
create table if not EXISTS staff(
   staff_id int(11) PRIMARY key AUTO_INCREMENT,
    name varchar(150),
   address varchar(255),
    staff_cat_id int(11),
    last_paid_date date,
    joined_date date,
    FOREIGN key (staff_cat_id) references staff_cat(staff_cat_id) on DELETE CASCADE);

create table if not EXISTS rest_table(
    table_id int(11) PRIMARY key AUTO_INCREMENT,
    is_empty bit,
    date_time Date,
    table_no int(11));

create table if not exists import(
    import_id int(11) primary key AUTO_INCREMENT,
    import_comp_id int(11),
    good varchar(255),
    bill_no int(11),
    quantiy varchar(80),
    total_price_rs double(10,2),
    import_date date,
    FOREIGN key (import_comp_id) references import_company(import_comp_id)
);

create table if not exists stock(
	stock_id int(11) PRIMARY key AUTO_INCREMENT,
	type_of_stock varchar(80),
    name varchar(120),
    import_id int(11),
    quantity varchar(80),
    FOREIGN key (import_id) REFERENCES import(import_id)
);