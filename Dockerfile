FROM node:8

ENV USER=app
ENV SUBDIR=src

RUN useradd --user-group --create-home --shell /bin/false $USER &&\
	npm install --global tsc-watch npm ntypescript typescript

ENV HOME=/home/$USER

COPY users.sqlite package.json tsconfig.json ormconfig.json yarn.lock $HOME/

COPY src $HOME/$SUBDIR

RUN yarn --pure-lockfile

RUN chown -R $USER:$USER $HOME/*

USER $USER

WORKDIR $HOME

RUN npm install

RUN mkdir avatars
CMD ["yarn", "start"]