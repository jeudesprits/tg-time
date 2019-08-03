import { Airgram, Auth, prompt } from 'airgram';
import { msleep } from './utils/helpers';
import secrets from './utils/secrets';
const { TG_APP_ID, TG_APP_HASH } = secrets;
import cron from 'node-cron';
import logger from './logger';
import { User, UserProfilePhotos } from '@airgram/api';

const airgram = new Airgram({
    command: './lib/libtdjson',
    apiId: Number(TG_APP_ID),
    apiHash: TG_APP_HASH,
    logVerbosityLevel: 2,
});


const auth = new Auth(airgram);

auth.use({
    phoneNumber: () => prompt('Please enter your phone number:\n'),
    code: () => prompt('Please enter the secret code:\n'),
});

let isFirst = true;

// tslint:disable-next-line: no-floating-promises
(async () => {
    let me = await airgram.api.getMe();
    let myId = (me as User).id;

    cron.schedule('* * * * *', async () => {
        try {
            const tashkentTimeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' });
            const tashkentTime = new Date(tashkentTimeString);
            const hours = `${tashkentTime.getHours()}`.padStart(2, '0');
            const minutes = `${tashkentTime.getMinutes()}`.padStart(2, '0');
            await airgram.api.setProfilePhoto({
                photo: {
                    _: 'inputFileLocal',
                    path: `./time_images/${hours}-${minutes}.jpeg`,
                }
            });

            if (!isFirst) {
                await msleep(1000);
                const response = await airgram.api.getUserProfilePhotos({
                    userId: myId,
                    limit: 2,
                });
                const profilePhotoId = (response as UserProfilePhotos).photos[1].id
                await airgram.api.deleteProfilePhoto({ profilePhotoId });
            }
        } catch (error) {
            logger.error(error.stack, { label: 'tg-time @jeudesprits' });
            return;
        }

        if (isFirst) {
            isFirst = false;
        }
    });
})();
