module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: [
        "./jest.setup.ts"
    ],
    "testMatch": [
        "**/*.bdd.*",
        "**/*.steps.*",
        "**/*.spec.*",
        "**/*.test.*"
    ],

    /** 
     * @package Enzyme
     */
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ],
    //"setupTestFrameworkScriptFile": "./jest.setup.ts",
    "setupFilesAfterEnv": [
        "./jest.setup.ts",
    ],
}