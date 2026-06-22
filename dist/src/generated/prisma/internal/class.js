"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum ProjectStatus {\n  draft\n  published\n}\n\nenum UserRole {\n  ADMIN\n  USER\n}\n\nmodel User {\n  id       String   @id @default(uuid())\n  email    String   @unique @db.VarChar(100)\n  password String   @db.Text\n  role     UserRole @default(USER)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Project {\n  id            String        @id @default(uuid())\n  title         String        @db.VarChar(100)\n  slug          String        @unique @db.VarChar(150)\n  description   String?       @db.Text\n  status        ProjectStatus @default(draft)\n  isFeatured    Boolean       @default(false)\n  imageUrl      String?\n  imagePublicId String?\n  demoLink      String        @db.Text\n  githubLink    String?       @db.Text\n  technologies  String[]      @default([])\n  setupGuide    String?       @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([technologies], type: Gin)\n  @@index([createdAt])\n  @@index([status, createdAt])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Project\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ProjectStatus\"},{\"name\":\"isFeatured\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imagePublicId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"demoLink\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"githubLink\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technologies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"setupGuide\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Project.findUnique\",\"Project.findUniqueOrThrow\",\"Project.findFirst\",\"Project.findFirstOrThrow\",\"Project.findMany\",\"Project.createOne\",\"Project.createMany\",\"Project.createManyAndReturn\",\"Project.updateOne\",\"Project.updateMany\",\"Project.updateManyAndReturn\",\"Project.upsertOne\",\"Project.deleteOne\",\"Project.deleteMany\",\"Project.groupBy\",\"Project.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"title\",\"slug\",\"description\",\"ProjectStatus\",\"status\",\"isFeatured\",\"imageUrl\",\"imagePublicId\",\"demoLink\",\"githubLink\",\"technologies\",\"setupGuide\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"has\",\"hasEvery\",\"hasSome\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"UserRole\",\"role\",\"set\",\"push\"]"),
    graph: "YBEgCSoAAFAAMCsAAAQAECwAAFAAMC0BAAAAATpAAEsAITtAAEsAIUoBAAAAAUsBAEcAIU0AAFFNIgEAAAABACABAAAAAQAgCSoAAFAAMCsAAAQAECwAAFAAMC0BAEcAITpAAEsAITtAAEsAIUoBAEcAIUsBAEcAIU0AAFFNIgADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAGLQEAAAABOkAAAAABO0AAAAABSgEAAAABSwEAAAABTQAAAE0CAQgAAAkAIAYtAQAAAAE6QAAAAAE7QAAAAAFKAQAAAAFLAQAAAAFNAAAATQIBCAAACwAwAQgAAAsAMAYtAQBWACE6QABbACE7QABbACFKAQBWACFLAQBWACFNAABgTSICAAAAAQAgCAAADgAgBi0BAFYAITpAAFsAITtAAFsAIUoBAFYAIUsBAFYAIU0AAGBNIgIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAAF0AIBYAAF8AIBcAAF4AIAkqAABMADArAAAXABAsAABMADAtAQA0ACE6QAA5ACE7QAA5ACFKAQA0ACFLAQA0ACFNAABNTSIDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIBEqAABGADArAAAdABAsAABGADAtAQAAAAEuAQBHACEvAQAAAAEwAQBIACEyAABJMiIzIABKACE0AQBIACE1AQBIACE2AQBHACE3AQBIACE4AAA4ACA5AQBIACE6QABLACE7QABLACEBAAAAGgAgAQAAABoAIBEqAABGADArAAAdABAsAABGADAtAQBHACEuAQBHACEvAQBHACEwAQBIACEyAABJMiIzIABKACE0AQBIACE1AQBIACE2AQBHACE3AQBIACE4AAA4ACA5AQBIACE6QABLACE7QABLACEFMAAAUgAgNAAAUgAgNQAAUgAgNwAAUgAgOQAAUgAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgDi0BAAAAAS4BAAAAAS8BAAAAATABAAAAATIAAAAyAjMgAAAAATQBAAAAATUBAAAAATYBAAAAATcBAAAAATgAAFwAIDkBAAAAATpAAAAAATtAAAAAAQEIAAAiACAOLQEAAAABLgEAAAABLwEAAAABMAEAAAABMgAAADICMyAAAAABNAEAAAABNQEAAAABNgEAAAABNwEAAAABOAAAXAAgOQEAAAABOkAAAAABO0AAAAABAQgAACQAMAEIAAAkADAOLQEAVgAhLgEAVgAhLwEAVgAhMAEAVwAhMgAAWDIiMyAAWQAhNAEAVwAhNQEAVwAhNgEAVgAhNwEAVwAhOAAAWgAgOQEAVwAhOkAAWwAhO0AAWwAhAgAAABoAIAgAACcAIA4tAQBWACEuAQBWACEvAQBWACEwAQBXACEyAABYMiIzIABZACE0AQBXACE1AQBXACE2AQBWACE3AQBXACE4AABaACA5AQBXACE6QABbACE7QABbACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAgVAABTACAWAABVACAXAABUACAwAABSACA0AABSACA1AABSACA3AABSACA5AABSACARKgAAMwAwKwAAMAAQLAAAMwAwLQEANAAhLgEANAAhLwEANAAhMAEANQAhMgAANjIiMyAANwAhNAEANQAhNQEANQAhNgEANAAhNwEANQAhOAAAOAAgOQEANQAhOkAAOQAhO0AAOQAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACARKgAAMwAwKwAAMAAQLAAAMwAwLQEANAAhLgEANAAhLwEANAAhMAEANQAhMgAANjIiMyAANwAhNAEANQAhNQEANQAhNgEANAAhNwEANQAhOAAAOAAgOQEANQAhOkAAOQAhO0AAOQAhDhUAADsAIBYAAEUAIBcAAEUAIDwBAAAAAT0BAAAABD4BAAAABD8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAEQAIUcBAAAAAUgBAAAAAUkBAAAAAQ4VAABCACAWAABDACAXAABDACA8AQAAAAE9AQAAAAU-AQAAAAU_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBBACFHAQAAAAFIAQAAAAFJAQAAAAEHFQAAOwAgFgAAQAAgFwAAQAAgPAAAADICPQAAADIIPgAAADIIQwAAPzIiBRUAADsAIBYAAD4AIBcAAD4AIDwgAAAAAUMgAD0AIQQ8AQAAAAVEAQAAAAFFAQAAAARGAQAAAAQLFQAAOwAgFgAAPAAgFwAAPAAgPEAAAAABPUAAAAAEPkAAAAAEP0AAAAABQEAAAAABQUAAAAABQkAAAAABQ0AAOgAhCxUAADsAIBYAADwAIBcAADwAIDxAAAAAAT1AAAAABD5AAAAABD9AAAAAAUBAAAAAAUFAAAAAAUJAAAAAAUNAADoAIQg8AgAAAAE9AgAAAAQ-AgAAAAQ_AgAAAAFAAgAAAAFBAgAAAAFCAgAAAAFDAgA7ACEIPEAAAAABPUAAAAAEPkAAAAAEP0AAAAABQEAAAAABQUAAAAABQkAAAAABQ0AAPAAhBRUAADsAIBYAAD4AIBcAAD4AIDwgAAAAAUMgAD0AIQI8IAAAAAFDIAA-ACEHFQAAOwAgFgAAQAAgFwAAQAAgPAAAADICPQAAADIIPgAAADIIQwAAPzIiBDwAAAAyAj0AAAAyCD4AAAAyCEMAAEAyIg4VAABCACAWAABDACAXAABDACA8AQAAAAE9AQAAAAU-AQAAAAU_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBBACFHAQAAAAFIAQAAAAFJAQAAAAEIPAIAAAABPQIAAAAFPgIAAAAFPwIAAAABQAIAAAABQQIAAAABQgIAAAABQwIAQgAhCzwBAAAAAT0BAAAABT4BAAAABT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAEMAIUcBAAAAAUgBAAAAAUkBAAAAAQ4VAAA7ACAWAABFACAXAABFACA8AQAAAAE9AQAAAAQ-AQAAAAQ_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBEACFHAQAAAAFIAQAAAAFJAQAAAAELPAEAAAABPQEAAAAEPgEAAAAEPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEARQAhRwEAAAABSAEAAAABSQEAAAABESoAAEYAMCsAAB0AECwAAEYAMC0BAEcAIS4BAEcAIS8BAEcAITABAEgAITIAAEkyIjMgAEoAITQBAEgAITUBAEgAITYBAEcAITcBAEgAITgAADgAIDkBAEgAITpAAEsAITtAAEsAIQs8AQAAAAE9AQAAAAQ-AQAAAAQ_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQBFACFHAQAAAAFIAQAAAAFJAQAAAAELPAEAAAABPQEAAAAFPgEAAAAFPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAQwAhRwEAAAABSAEAAAABSQEAAAABBDwAAAAyAj0AAAAyCD4AAAAyCEMAAEAyIgI8IAAAAAFDIAA-ACEIPEAAAAABPUAAAAAEPkAAAAAEP0AAAAABQEAAAAABQUAAAAABQkAAAAABQ0AAPAAhCSoAAEwAMCsAABcAECwAAEwAMC0BADQAITpAADkAITtAADkAIUoBADQAIUsBADQAIU0AAE1NIgcVAAA7ACAWAABPACAXAABPACA8AAAATQI9AAAATQg-AAAATQhDAABOTSIHFQAAOwAgFgAATwAgFwAATwAgPAAAAE0CPQAAAE0IPgAAAE0IQwAATk0iBDwAAABNAj0AAABNCD4AAABNCEMAAE9NIgkqAABQADArAAAEABAsAABQADAtAQBHACE6QABLACE7QABLACFKAQBHACFLAQBHACFNAABRTSIEPAAAAE0CPQAAAE0IPgAAAE0IQwAAT00iAAAAAAFOAQAAAAEBTgEAAAABAU4AAAAyAgFOIAAAAAECTgEAAAAETwEAAAAFAU5AAAAAAQFOAQAAAAQAAAABTgAAAE0CAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAAAAAxUADhYADxcAEAAAAAMVAA4WAA8XABABAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIYGAUZGQkaGwobHAocHwodIAoeIQofIwogJQIhJgsiKAojKgIkKwwlLAomLQonLgIoMQ0pMhE"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map