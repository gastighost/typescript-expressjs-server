"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/users", user_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = async () => {
    try {
        await (0, mongodb_1.default)();
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
