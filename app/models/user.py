from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join import likes, follows
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    nickname = db.Column(db.String(40))
    bio = db.Column(db.Text(500))
    profile_pic = db.Column(db.String(255), nullable=False)
    banner_pic = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Note", back_populates="user")
    likes = db.relationship(
        "Post",
        secondary="user_likes",
        back_populates="likes"
    )

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=follows.columns.follower == id,
        secondaryjoin=follows.columns.followed == id,
        back_populates="following"
    )

    following = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=follows.columns.followed == id,
        secondaryjoin=follows.columns.follower == id,
        back_populates="followers"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'nickname': self.nickname,
    #         'bio': self.bio,
    #         'profilePic': self.profile_pic,
    #         'bannerPic': self.banner_pic,
    #         'email': self.email,
    #         # 'likes': len(self.user_likes),
    #         'posts': [post.to_dict_no_user() for post in self.posts]
    #     }

    # def to_dict_no_post(self):
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "nickname": self.nickname,
    #         "bio": self.bio,
    #         "email": self.email,
    #         "profilePic": self.profile_pic
    #     }
