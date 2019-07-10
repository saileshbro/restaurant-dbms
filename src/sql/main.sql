CREATE TABLE food_category
(
    food_category_id int(12) not null,
    food_category_name char(50),
    primary key(food_category_id)
);

CREATE TABLE food_item
(
    food_item_id varchar(10) not null,
    name char(18),
    price int(7),
    food_category_id int(12),
    primary key(food_item_id),
    FOREIGN KEY (food_category_id) REFERENCES food_category(food_category_id) ON DELETE CASCADE
);

CREATE TABLE menu
(
    menu_id varchar(12) not null,
    start_date date,
    end_date date,
    is_active int(1),
    primary key(menu_id)
);
CREATE TABLE menu_content
(
    menu_id varchar(12) not null,
    food_item_id char(20),
    is_available char(5),
    FOREIGN KEY (food_item_id) REFERENCES food_item(food_item_id) ON DELETE CASCADE,
    FOREIGN KEY(menu_id) REFERENCES menu(menu_id)
);

