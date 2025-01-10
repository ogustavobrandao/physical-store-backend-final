import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { OrsService } from "./ors.service";

@Module({
    imports: [HttpModule],
    providers: [OrsService],
    exports: [OrsService]
})
export class OrsModule{}