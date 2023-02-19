"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanity_1 = require("sanity");
const desk_1 = require("sanity/desk");
const vision_1 = require("@sanity/vision");
const schemas_1 = require("./schemas");
exports.default = (0, sanity_1.defineConfig)({
    name: 'default',
    title: 'cms',
    projectId: 'mldevhm0',
    dataset: 'production',
    plugins: [(0, desk_1.deskTool)(), (0, vision_1.visionTool)()],
    schema: {
        types: schemas_1.schemaTypes,
    },
});
