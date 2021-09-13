import { RegistrationService } from './../Services/registration.service';
import { step1ValidateDto } from '../dto/step1ValidateDto';
import { Body, Controller, Post, HttpCode, Response, UseInterceptors, UploadedFile, Get, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imgFileFilter } from '../config/filterEditName';
import { newUserDto } from '../dto/newUser.dto';

@Controller('users/registration')
export class RegistrationController  {
    constructor(private RegistrationService: RegistrationService,
      ) {}

    @Post('step1')
    @HttpCode(200)
    step1Validate(@Body() step1ValidateDto: step1ValidateDto) {
      console.log(step1ValidateDto);
      return;
    }

    @Post('uploadAvatar')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatar'
        , filename: editFileName
      }),
      fileFilter: imgFileFilter,
      limits: { fileSize: 3e+7 },
    }))
    step2(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return {"img": file.filename};
    }

    @Get('toStep3')
    toStep3() {
      console.log("req")
      return;
    }

    @Post('uploadDocs')
    @UseInterceptors(FilesInterceptor('uploadDocs', 20, {
      storage: diskStorage({
        destination: ('./uploads/docs')
        , filename: editFileName
      }),
      fileFilter: imgFileFilter
    }))
    step3UploadDocs(@UploadedFiles() files: any) {
      
      return files.map(el => {
        return {
          "img": el.filename,
          "size": (el.size/1000000).toFixed(2),
          "extension": el.mimetype.slice(el.mimetype.indexOf("/")+1)
        }
      })
    }

    @Post('removePhoto')
    removeDoc(@Body() removeDto, @Response() res: any) {
      return this.RegistrationService.step3removeDoc(removeDto, res)
    }

    @Post('toSuccess')
    toSuccess(@Body() newUserDto: newUserDto, @Response() res: any) {
      console.log("test");
      return this.RegistrationService.step3registration(newUserDto, res);
    }
}