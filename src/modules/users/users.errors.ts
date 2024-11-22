import { HttpException, HttpStatus } from '@nestjs/common';

class RequirmentErrors extends HttpException {}

export class userNotFound extends RequirmentErrors {
  constructor(id: string) {
    const message = `The user with the ${
      Object.keys(id)[0]
    } ${id} not found or it was already deleted`;

    super(
      {
        status: HttpStatus.NOT_FOUND,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class userNotCreated extends RequirmentErrors {
  constructor(error) {
    super(
      {
        error,
        message: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class userNotDeleted extends RequirmentErrors {
  constructor(error) {
    super(
      {
        error,
        message:
          'An unexpected error ocurred while trying to delete the example',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
