import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {

    public static start(){

        console.log('Server started');
        
        CronService.createJob(
            '*/5 * * * * *',
            () =>{
                const url = 'http://localhost:3000';
                //'http://localhost:3000'
                //'https://google.com'
               new CheckService(
                   fileSystemLogRepository,
                   () => console.log(`${url} is working`),
                     (error) => console.log(`Error ${error}`)
               ).execute( url )
        }
    );
    }
}

//agregamos patron repository, principio DRY y clean architecture para nuestro NOC que 
// es un servicio de verificacion de servicios externos coo seria una url