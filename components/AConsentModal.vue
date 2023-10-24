<template>
  <input type="checkbox" id="consent_modal" class="modal-toggle" aria-hidden="true" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Cookie Settings</h3>
      <p class="py-4">
        By clicking "Accept All Cookies", you agree to the use of Resume-ATS and
        third-party cookies to enhance your experience, analyse and measure your
        engagement with our content, and provide more relevant information.
      </p>
      <div class="modal-action">
        <button id="decline-button" class="btn btn-active btn-ghost" @click="decline">
          Decline
        </button>
        <button id="consent-button" class="btn btn-active btn-primary" @click="consentToAll">
          Accept All Cookies
        </button>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
const loadAds = ref(false);
const consentAnalyticsCookies = useCookie<{ consent: boolean }>(
  "consentanalytics"
);
const consentAdCookies = useCookie<{ consent: boolean }>("consentads");
const { grantConsent } = useGtag()

const consentToAll = () => {
  let consent_state = <HTMLInputElement>(
    document.getElementById("consent_modal")
  );
  consentAnalyticsCookies.value = { consent: true };
  grantConsent();
  consent_state.checked = false;
};

const decline = () => {
  let consent_state = <HTMLInputElement>(
    document.getElementById("consent_modal")
  );
  consent_state.checked = false;
};
</script>