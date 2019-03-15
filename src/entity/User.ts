import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, BeforeRemove} from "typeorm";

const bcrypt = require('bcrypt')
const saltRounds = 10

const download = require('image-downloader')
const fs = require('fs');

const rimraf = require("rimraf")

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "230" })
  firstName: string;

  @Column({ type: "varchar", length: "230" })
  lastName: string;

  @Column({ type: "text", unique: true })
  userName: string;

  @Column({ type: "text"})
  avatar: string;

  @Column({ type: "text" })
  public password: string;


  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    let salt = bcrypt.genSaltSync(saltRounds)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  @BeforeInsert()
  @BeforeUpdate()
  private saveAvatar(): void {
      let options = {
          url: this.avatar,
          dest: 'avatars/' + this.userName + '/'
      }
      // Ensuring the path and saving the avatar to file system
      if (!fs.existsSync(options.dest)) {
          fs.mkdirSync(options.dest);
      }
      let filename = this.avatar.split('/')
      this.avatar = options.dest + filename[filename.length - 1]
      try {
      download.image(options)
      } catch(err) {
      this.avatar = null
      console.error('Avatar could not be saved.', err)
      }
  }

  @BeforeRemove()
  private removeAvatar(): void {
      try{
        console.log('Removed user: @' + this.userName)
        rimraf('avatars/' + this.userName, () => {})
      }
      catch (e) {
        console.error(e)
      }
  }
}