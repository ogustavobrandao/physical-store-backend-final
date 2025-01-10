import { Module } from "@nestjs/common";
import { ViaCepService } from "./viacep.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    providers: [ViaCepService],
    exports: [ViaCepService]
})
export class ViaCepModule{}