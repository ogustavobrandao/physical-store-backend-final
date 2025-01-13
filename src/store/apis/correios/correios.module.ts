import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CorreioService } from "./correios.service";

@Module({
    imports: [HttpModule],
    providers: [CorreioService],
    exports: [CorreioService]
})
export class CorreioModule{}