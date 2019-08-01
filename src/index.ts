import { Airgram, Auth, prompt } from 'airgram';
import { User, UserProfilePhotos } from '@airgram/api';
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

const auth = new Auth(airgram);

auth.use({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
});

// tslint:disable-next-line: no-floating-promises
(async () => {
    const me = await airgram.api.getMe();
    const myId = (me as User).id;

    cron.schedule('* * * * *', async () => {
        try {
            const tashkentTimeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' });
            const tashkentTime = new Date(tashkentTimeString);
            await airgram.api.setProfilePhoto({
                photo: {
                    _: 'inputFileLocal',
                    path: `./time_images/${tashkentTime.getHours()}-${tashkentTime.getMinutes()}.jpeg`,
                }
            });

            const userProfilePhotos = await airgram.api.getUserProfilePhotos({
                userId: myId,
                limit: 2,
            });
            const photos = (userProfilePhotos as UserProfilePhotos).photos;

            if (photos.length === 2) {
                const deletePhotoId = photos[1].id;
                await airgram.api.deleteProfilePhoto({ profilePhotoId: deletePhotoId });
            }
        } catch (error) {
            logger.error(error.stack, { label: 'tg-time @jeudesprits' });
        }
    });
})();
