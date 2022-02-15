/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import 'reflect-metadata';
import '../../locales/config';

import React from 'react';

import { observer } from 'mobx-react';
import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { AuthMessage } from '../../components/AuthMessage';
import { ButtonSpinner } from '../../components/ButtonSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { SignUpStore } from '../../stores/components';
import { Gender } from '../../stores/components/SignUpStore';

const SignUp = observer(() => {
  const store = useInjection<SignUpStore>(IoCTypes.signUpStore);
  const { t } = useTranslation(['signUp']);

  return (
    <Container>
      <Row>
        {store.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1>{t('title')}</h1>
            <Col>
              <Form
                onSubmit={(event_) => {
                  event_.preventDefault();
                  store.signUp();
                }}
              >
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>{t('firstName')}</Form.Label>
                  <Form.Control
                    placeholder={t('placeholder.firstName')}
                    value={store.firstName}
                    onChange={(event_) => {
                      store.changeFirstName(event_.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>{t('lastName')}</Form.Label>
                  <Form.Control
                    placeholder={t('placeholder.lastName')}
                    value={store.lastName}
                    onChange={(event_) => {
                      store.changeLastName(event_.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <Form.Label>{t('username')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>@</InputGroup.Text>
                    <FormControl
                      placeholder={t('placeholder.username')}
                      onChange={(event_) => {
                        store.changeUsername(event_.target.value);
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicMobile">
                  <Form.Label>{t('mobile')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>+</InputGroup.Text>
                    <FormControl
                      type="tel"
                      pattern="^\d{3} \d{2} \d{3} \d{2} \d{2}"
                      placeholder={t('placeholder.mobile')}
                      value={store.mobile}
                      onChange={(event_) => {
                        store.changeMobile(event_.target.value);
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicAge">
                  <Form.Label>{t('placeholder.age')}</Form.Label>
                  <FormControl
                    placeholder={t('placeholder.age')}
                    value={store.age}
                    onChange={(event_) => {
                      store.changeMobile(event_.target.value);
                    }}
                  />
                  <Form.Range
                    min="5"
                    max="100"
                    defaultValue="18"
                    onChange={(event_) => {
                      store.changeAge(Number.parseInt(event_.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicGender">
                  <Form.Label>{t('gender')}</Form.Label>
                  <Form.Select
                    defaultValue={Gender.Undefined}
                    onChange={(event_) => {
                      store.changeGender(Number.parseInt(event_.target.value));
                    }}
                  >
                    <option value={Gender.Undefined}>{t<string>('placeholder.gender')}</option>
                    <option value={Gender.Male}>{t<string>('genderType.male')}</option>
                    <option value={Gender.Female}>{t<string>('genderType.female')}</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t('emailAddress')}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder={t('placeholder.email')}
                    value={store.email}
                    onChange={(event_) => {
                      store.changeEmail(event_.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('placeholder.password')}
                    value={store.password}
                    aria-describedby="passwordHelpBlock"
                    onChange={(event_) => {
                      store.changePassword(event_.target.value);
                    }}
                  />
                  <Form.Text muted>
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                    spaces, special characters, or emoji.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordConfirmation">
                  <Form.Label>{t('passwordConfirmation')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('placeholder.passwordConfirmation')}
                    value={store.passwordConfirmation}
                    onChange={(event_) => {
                      store.changePasswordConfirmation(event_.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    required
                    label={t('agreeTerms')}
                    feedback={t('agreeTermsFeedback')}
                    feedbackType="invalid"
                  />
                </Form.Group>

                <ButtonSpinner
                  isLoading={store.isLoading}
                  type="submit"
                  text={t('submit')}
                  onClick={() => {
                    null;
                  }}
                  onChange={() => {
                    null;
                  }}
                />

                {!!store.token && <AuthMessage message={t('success', { token: store.token, id: store.id })} />}

                {!!store.token && <Navigate replace to="/" />}

                {!!store.error && <ErrorMessage error={store.error} />}
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
});

export default SignUp;
