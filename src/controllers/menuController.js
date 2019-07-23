const pool = require('../database/database');

module.exports.addMenu = async (req, res) => {
    const {
        menu_name,
        menu_start_date,
        menu_end_date,
        is_menu_active
    } = req.body;
    if (menu_name.length == 0 || !menu_name) {
        return res.send({ error: "Please provide menu name." });
    }
    try {
        const insertmenu = await pool.query(
            `INSERT INTO menu SET menu_name=?,menu_start_date=?,menu_end_date=?,is_menu_active=?`,
            [menu_name, menu_start_date, menu_end_date, is_menu_active]
        );
        console.log(insertmenu);
        if (insertmenu.affectedRows == 1) {
            return res.send({ message: "Menu successfully added." });
        } else {
            return res.status(400).send({ error: "Unable to add menu." });
        }

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(500).send({
                error: "Menu with given credentials already exists."
            });
        } else {
            return res.status(500).send({ error });
        }
    }
};

module.exports.updateMenu = async (req, res) => {
    const {
        menu_start_date,
        menu_end_date,
        is_menu_active
    } = req.body;
    const menu_name_to_update = req.body.menu_name;
    const { menu_name } = req.params;
    if (menu_name.length == 0 || !menu_name) {
        return res.send({ error: "Please provide menu name." });
    }
    try {

        const updateMenu = await pool.query(
            "UPDATE menu SET menu_name=?,menu_end_date=?,is_menu_active=? WHERE menu_name=? AND menu_start_date=?",
            [menu_name_to_update, menu_end_date, is_menu_active, menu_name, menu_start_date]
        );
        if (updateMenu.affectedRows == 1) {
            return res.send({ message: "Menu Successfully updated." });
        } else {
            return res.status(400).send({ error: "Unable to update menu." });
        }

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY")
            return res
                .status(500)
                .send({ error: `Menu credentials already exists.` });
        else return res.status(500).send({ error });
    }

}

module.exports.addMenuContents = async (req, res) => {
    const {
        menu_contents
    } = req.body;
    const { menu_name } = req.params;
    console.log(menu_name);
    if (menu_name.length == 0 || !menu_name) {
        return res.send({ error: "Please provide menu name." });
    } try {
        for (let i = 0; i < menu_contents.length; i++) {
            await pool.query('SET FOREIGN_KEY_CHECKS=0');
            const insertMenuContents = await pool.query(
                `INSERT INTO menu_content SET menu_name=?,food_item_name=?`,
                [menu_name,
                    menu_contents[i].food_item_name,
                ]
            );
            if (insertMenuContents.affectedRows != 0) {
                return res.send({ message: "Menu Contents successfully added." });
            } else {
                return res.status(400).send({
                    error: "Unable to add menu content."
                });
            }
        }
        await pool.query('SET FOREIGN_KEY_CHECKS=1');
    } catch (error) {
        return res.status(500).send({ error });
    }
}
module.exports.getActiveMenu = async (req, res) => {
    try {
        const menus = await pool.query("SELECT menu.menu_name,menu_start_date,menu_end_date,menu_content.food_item_name,menu_content.is_food_available FROM menu INNER JOIN menu_content ON menu.menu_name = menu_content.menu_name WHERE menu.is_menu_active=?", [1]);
        if (menus.length == 0) {
            return res.status(404).send({ error: "No active menu" });
        } else {
            const active_menu_name = menus[1].menu_name;
            const menu_start_date = menus[1].menu_start_date;
            const menu_end_date = menus[1].menu_end_date;
            menus.forEach(rslt => {
                delete rslt.menu_name;
                delete rslt.menu_start_date;
                delete rslt.menu_end_date;
            });
            return res.send({
                active_menu_name,
                menu_start_date,
                menu_end_date,
                menu_contents: menus
            });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }
}
module.exports.getMenus = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM menu");
        return res.send({ menus: results });
    } catch (error) {
        return res.status(500).send({ error })
    }
}
