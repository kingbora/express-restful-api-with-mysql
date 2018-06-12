/**
 * Created by wenbo.kuang on 2018/6/11.
 */
const Sequelize = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define('user', {
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
        unique: true,
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
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

User.sync();

module.exports = User;