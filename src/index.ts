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

// tslint:disable-next-line: no-unused-expression
const auth = new Auth(airgram);

auth.use({
    code: () => prompt('Please enter the secret code:\n'),
    phoneNumber: () => prompt('Please enter your phone number:\n'),
});

// tslint:disable-next-line: no-floating-promises
(async () => {
    const me = await airgram.api.getMe();
    const myId = (me as User).id;

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

            const userProfilePhotos = await airgram.api.getUserProfilePhotos({
                userId: myId,
                limit: 2,
            });
            if ((userProfilePhotos as UserProfilePhotos).totalCount === 2) {
                const photos = (userProfilePhotos as UserProfilePhotos).photos;
                const deletePhotoId = photos[1].id;
                await airgram.api.deleteProfilePhoto({ profilePhotoId: deletePhotoId });
            }
        } catch (error) {
            logger.error(error.stack, { label: 'tg-time @jeudesprits' });
        }
    });
})();
