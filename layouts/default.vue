<template>
  <div class="container-fluid mx-auto">
    <div class="navbar bg-primary text-primary-content">
      <div class="flex-1 xl:px-20 2xl:px-30">
        <NuxtLink to="/">
          <ResumeATSLogo></ResumeATSLogo>
        </NuxtLink>
      </div>
      <div class="flex-none hidden lg:flex">
        <ul class="menu menu-horizontal lg:px-1 xl:px-20 2xl:px-30">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li @click="handleClick()">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto">
      <NuxtPage />
    </div>
    <AConsentModal></AConsentModal>
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col">
        <p>Copyright © 2024 Spero Autem LLC - All right reserved</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      </div>
    </footer>
  </div>
</template>
  
<script setup lang="ts">
const consentAnalyticsCookies = useCookie<{ consent: boolean }>(
  "consentanalytics"
);

const { grantConsent } = useGtag()

onNuxtReady(async () => {
  if (
    consentAnalyticsCookies.value &&
    consentAnalyticsCookies.value.consent == true
  ) {
    console.log("Consent Cookie detected");
    grantConsent()
  } else {
    console.log("NO CONSENT COOKIES");
    let consent_state = <HTMLInputElement>(
      document.getElementById("consent_modal")
    );
    consent_state.checked = true;
  }
});

const handleClick = () => {
  const elem = <HTMLElement>document.activeElement;
  if (elem) {
    elem?.blur();
  }
};
</script>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>