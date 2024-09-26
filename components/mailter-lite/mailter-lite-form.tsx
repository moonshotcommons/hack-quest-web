const MailterLiteForm = () => {
  return (
    <div>
      <div id="mlb2-18090423" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-18090423 pt-2">
        <div className="ml-form-align-center ">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              {/* <div className="ml-form-embedContent">
                  <h4>We&apos;d love to see you there</h4>
                  <p>
                    🚀&nbsp;Signup for our newsletter, event notification, and more.&nbsp;
                    <br />
                  </p>
                </div> */}

              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/1056158/forms/132693837240862303/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow ml-last-item">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control focus:outline-none"
                        data-inputmask=""
                        name="fields[email]"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-form-embedPermissions">
                  <div className="ml-form-embedPermissionsContent default">
                    {/* <h4>Marketing Permission</h4>
  
                      <p>
                        Your information will be used solely for news and event updates. You can unsubscribe anytime as
                        your privacy is important to us.
                        <br />
                      </p> */}

                    <div className="ml-form-embedPermissionsOptions">
                      <div className="ml-form-embedPermissionsOptionsCheckbox">
                        <label>
                          <input type="checkbox" name="gdpr[]" value="Newsletter and Events" xp-if="gdpr.title" />
                          <div className="label-description">Newsletter and Events</div>
                        </label>
                        <div className="description" xp-if="gdpr.description">
                          We&apos;ll occasionally send updates about our monthly news and upcoming hackathons or events
                          to keep you informed.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-form-embedMailerLite-GDPR">
                    <p>
                      <span style={{ fontSize: '11px' }}>
                        By clicking below to submit this form, you acknowledge that the information you provide will be
                        processed in accordance with our Privacy Policy.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="ml-form-checkboxRow ml-validate-required">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="label-description">
                      <p>
                        <strong>I confirm to opt in for news and updates</strong>
                      </p>
                    </div>
                  </label>
                </div>

                <input type="hidden" name="ml-submit" value="1" />

                <div className="ml-form-embedSubmit flex">
                  <button type="submit" className="primary">
                    Subscribe
                  </button>

                  <button disabled={true} style={{ display: 'none' }} type="button" className="loading">
                    <div className="flex w-full items-center justify-center">
                      <div className="ml-form-embedSubmitLoad"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                </div>

                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
              <div className="ml-form-successContent">
                <h4>You are all set!</h4>
                <p>
                  <br />
                </p>
                <p>Great news!&nbsp;You&apos;ve successfully joined our subscriber list.&nbsp;</p>
                <p>🔥Keep an eye out for some exciting updates coming your way!</p>
                <p>
                  <br />
                </p>

                <p>LFG,&nbsp;</p>
                <p>HackQuest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailterLiteForm;
