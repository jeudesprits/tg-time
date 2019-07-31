import { Airgram } from 'airgram';
import secrets from './utils/secrets';
const { TG_APP_ID, TG_APP_HASH } = secrets;

const airgram = new Airgram({
    command: 'lib/libtdjson.so',
    apiId: Number(TG_APP_ID),
    apiHash: TG_APP_HASH,
    logVerbosityLevel: 0,
});

// tslint:disable-next-line: no-floating-promises
(async () => {
    try {
        await airgram.api.setProfilePhoto({
            photo: {
                _: 'inputFileLocal',
                path: 'time_images/00-00.jpeg'
            }
        });
    } catch (error) {
        console.error(error);
    }
})();
