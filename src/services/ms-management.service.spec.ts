import moxios from 'moxios';

import MsManagementService from './ms-management.service';
import { MixinsOptions } from '@material-ui/core/styles/createMixins';

describe('MsManagementService', () => {

    beforeEach(() => {
        moxios.install();
    })
    afterEach(() => {
        moxios.uninstall();
    })

    describe("Users", () => {

        describe("POST", () => {

            it ("Should successfully create a new user", async () => {

                const expectedData = {
                    id : 1,
                    email : "john.doe@email.com",
                    first_name : "John",
                    last_name : "Doe",
                    mobile_phone : "02112345678"
                }

                moxios.wait(() => {
                    const request: any = moxios.requests.mostRecent();
                    request.respondWith({
                        status : 200,
                        response : expectedData
                    })
                });

                const userData = {
                    firstname : "John",
                    lastname : "Doe",
                    email : "john.doe@email.com",
                    phone : "02112345678"
                }

                const createUserData = await MsManagementService.apiCreateUser(userData);

                expect(createUserData).toEqual(expectedData);
                
            })
        })
    })

})