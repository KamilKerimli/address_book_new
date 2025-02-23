import React, { useEffect } from 'react'

const PrivacyCom = () => {
    useEffect(()=>{
        document.querySelector('button').addEventListener('click', () => {
            const privacySetting = document.querySelector('input[name="privacy"]:checked').value;
            const profileVisibility = Array.from(document.querySelectorAll('input[name="profileVisibility"]:checked')).map(el => el.nextElementSibling.textContent);
            const notifications = Array.from(document.querySelectorAll('input[name="notifications"]:checked')).map(el => el.nextElementSibling.textContent);

            alert(`Settings saved:\nPrivacy: ${privacySetting}\nProfile Visibility: ${profileVisibility.join(', ')}\nNotifications: ${notifications.join(', ')}`);
        });
    })
  return (
    <div class="mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4 dark:text-white w-full text-center">Privacy Settings</h1>

        <div class="bg-white dark:bg-blue-600 rounded-lg shadow-md p-4 mb-4">
            <h2 class="text-lg font-semibold mb-2">Account Privacy</h2>
            <div class="space-y-2">
                <label class="flex items-center">
                    <input type="radio" name="privacy" value="public" class="form-radio h-4 w-4 text-blue-600" />
                    <span class="ml-2">Public Account</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="privacy" value="private" class="form-radio h-4 w-4 text-blue-600" checked />
                    <span class="ml-2">Private Account</span>
                </label>
            </div>
        </div>

        <div class="bg-white dark:bg-blue-600 rounded-lg shadow-md p-4 mb-4">
            <h2 class="text-lg font-semibold mb-2">Profile Visibility</h2>
            <div class="space-y-2">
                <label class="flex items-center">
                    <input type="checkbox" name="profileVisibility" class="form-checkbox h-4 w-4 text-blue-600" />
                    <span class="ml-2">Allow everyone to see my profile</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" name="profileVisibility" class="form-checkbox h-4 w-4 text-blue-600" />
                    <span class="ml-2">Allow only followers to see my profile</span>
                </label>
            </div>
        </div>

        <div class="bg-white dark:bg-blue-600 rounded-lg shadow-md p-4 mb-4">
            <h2 class="text-lg font-semibold mb-2">Notification Settings</h2>
            <div class="space-y-2">
                <label class="flex items-center">
                    <input type="checkbox" name="notifications" class="form-checkbox h-4 w-4 text-blue-600" />
                    <span class="ml-2">Enable email notifications</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" name="notifications" class="form-checkbox h-4 w-4 text-blue-600" />
                    <span class="ml-2">Enable push notifications</span>
                </label>
            </div>
        </div>

        <div class="flex justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Settings</button>
        </div>
    </div>
  )
}

export default PrivacyCom