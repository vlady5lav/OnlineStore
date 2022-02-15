/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import 'reflect-metadata';
import '../../locales/config';

import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { AuthMessage } from '../../components/AuthMessage';
import { ButtonSpinner } from '../../components/ButtonSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { SignInStore } from '../../stores/components';

const SignIn = observer(() => {
  const store = useInjection<SignInStore>(IoCTypes.signInStore);
  const { t } = useTranslation(['signIn']);
  const [email, setEmail] = useState<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);

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
                  store.signIn();
                }}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t('emailAddress')}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder={t('placeholder.email')}
                    value={store.email}
                    onChange={(event_) => {
                      store.changeEmail(event_.target.value);
                      store.email.length >= 3 ? setEmail(true) : setEmail(false);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder={t('placeholder.password')}
                    value={store.password}
                    onChange={(event_) => {
                      store.changePassword(event_.target.value);
                      store.password.length >= 8 ? setPass(true) : setPass(false);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRememberMe">
                  <Form.Check type="checkbox" label={t('rememberMe')} />
                </Form.Group>

                <Form.Group controlId="formBasicInvisible">
                  <Form.Check type="checkbox" label={t('invisible')} />
                </Form.Group>

                <ButtonSpinner
                  disabled={email === false || pass === false}
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

                {!!store.token && <AuthMessage message={t('success', { token: store.token })} />}

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

export default SignIn;
