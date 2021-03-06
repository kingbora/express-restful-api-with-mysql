/**
 * Created by wenbo.kuang on 2018/6/11.
 */
const Sequelize = require("sequelize");
const sequelize = require("../../config/db");
const util = require("../utils");

const User = sequelize.define('tb_user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        set(val) {
            if (!util.isEmpty(val)) {
                this.setDataValue("username", val);
            } else {
                this.setDataValue("username", util.UUID(8));
            }
        },
        get() {
            return this.getDataValue("username");
        },
        comment: "用户名"
    },
    password: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "密码"
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "姓名"
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

User.sync();

module.exports = User;