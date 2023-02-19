"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'user',
    type: 'document',
    title: "User",
    fields: [
        {
            name: 'first_name',
            type: 'string',
            title: "First_name"
        },
        {
            name: 'last_name',
            type: 'string',
            title: "Last_name"
        },
        {
            name: 'email',
            type: 'email',
            title: "Email"
        },
        {
            name: 'password',
            type: 'string',
            title: "Password"
        },
        {
            name: "age",
            type: 'number',
            title: "Age"
        },
        {
            name: "profile_image",
            type: "image",
            title: "Profile_image",
            options: {
                accept: [
                    { arg: "image/png" },
                    { arg: 'image/jpg' },
                    { arg: 'image/svg' },
                ],
                maxSize: 30024 // 30MB
            }
        }
    ]
};
