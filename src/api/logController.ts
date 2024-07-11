import path from 'path';
import * as fs from 'fs';
import { Request, Response, Router } from 'express';

export class LogController {
    path = '/';
    router = Router();

    constructor() {
        this.router.get(this.path, this.reloadLogs.bind(this));
        this.router.get(this.path + 'live', this.getLogs.bind(this));
        this.router.get(this.path + ':date', this.getDateLogs.bind(this));
    }

    public async reloadLogs(req: Request, res: Response): Promise<Response> {
        res.status(200).sendFile(path.join(__dirname, '../page.html'));
    };

    public async getLogs(req: Request, res: Response): Promise<Response> {
        const files = fs.readdirSync('./logs');

        let check = false;

        for (const file of files) {
            if (path.extname(file) === '.txt') {
                const data = fs.readFileSync(path.join('./logs', file), 'utf8');
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).send(data);
                check = true;
            }
        }
        if (!check) {
            res.status(404).send(`No Log Files available: ${files.join(",")}`);
        }
    };

    public async getDateLogs(req: Request, res: Response): Promise<Response> {
        const oldLogs = path.join('./archive', req.params.date + '.txt');
        if (fs.existsSync(oldLogs)) {
            try {
                const data = fs.readFileSync(oldLogs, 'utf8');
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).send(data);
            } catch (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(404).send('File not found');
        }
    };
}