import { Airgram, Auth, prompt } from 'airgram';
import { User } from '@airgram/api';
import secrets from './utils/secrets';
const { TG_APP_ID, TG_APP_HASH } = secrets;
import cron from 'node-cron';
import logger from './logger';

const airgram = new Airgram({
    command: './lib/libtdjson',
    apiId: Number(TG_APP_ID),
    apiHash: TG_APP_HASH,
    logVerbosityLevel: 2,
});

// tslint:disable-next-line: no-unused-expression
const auth = new Auth(airgram);

auth.use({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
});

cron.schedule('* * * * *', async () => {
    try {
        const me = await airgram.api.getMe();
        const profilePhoto = (me as User).profilePhoto;
        if (profilePhoto) {
            await airgram.api.deleteProfilePhoto({
                profilePhotoId: profilePhoto.id
            })
        }

        const tashkentTimeString = new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
        const tashkentTime = new Date(tashkentTimeString);
        await airgram.api.setProfilePhoto({
            photo: {
                _: 'inputFileLocal',
                path: `./time_images/${tashkentTime.getHours()}-${tashkentTime.getMinutes()}.jpeg`,
            }
        });
    } catch (error) {
        logger.error(error.stack, { label: 'tg-time @jeudesprits' });
    }
});