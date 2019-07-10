CREATE TABLE food_category
(
    food_category_id int(12) not null,
    food_category_name varchar(100),
    primary key(food_category_id)
);

CREATE TABLE food_item
(
    food_item_id int(10) not null,
    name varchar(100),
    price int(10),
    food_category_id int(10),
    primary key(food_item_id),
    FOREIGN KEY (food_category_id) REFERENCES food_category(food_category_id) ON DELETE CASCADE
);

CREATE TABLE menu
(
    menu_id int(11) not null,
    start_date date,
    end_date date,
    is_active int(1),
    primary key(menu_id)
);
CREATE TABLE menu_content
(
    menu_id int(11) not null,
    food_item_id int(10),
    is_available int(1),
    FOREIGN KEY (food_item_id) REFERENCES food_item(food_item_id) ON DELETE CASCADE,
    FOREIGN KEY(menu_id) REFERENCES menu(menu_id)
);

