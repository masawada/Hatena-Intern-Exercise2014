package Log;
use strict;
use warnings;
use POSIX;

# Timezone
$ENV{'TZ'} = "JST";

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[2];
}

sub method {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[0];
}

sub path {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[1];
}

sub uri {
  my $self = shift;
  return "http://" .  $self->{host} . $self->path
}

sub time {
  my $self = shift;
  return POSIX::strftime "%Y-%m-%dT%H:%M:%S", localtime($self->{epoch});
}

1;
